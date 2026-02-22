'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { createEvent, updateEvent, deleteEvent, uploadAdminImage } from '@/app/actions'
import { Loader2, Pencil, Trash2, Plus, Calendar } from 'lucide-react'

export default function AdminEventsPage() {
    const [events, setEvents] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const { toast } = useToast()
    const supabase = createClient()

    const [formData, setFormData] = useState({
        title: '', event_date: '', short_description: '', full_summary: '',
        registration_link: '', registration_date: '', registration_open: 'false', published: 'false',
        images: [] as string[]
    })

    const fetchEvents = async () => {
        setIsLoading(true)
        const { data } = await supabase.from('events').select('*').order('event_date', { ascending: false })
        if (data) setEvents(data)
        setIsLoading(false)
    }

    useEffect(() => { fetchEvents() }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return
        setIsUploading(true)
        const file = e.target.files[0]
        const uploadData = new FormData()
        uploadData.append('image', file)

        const result = await uploadAdminImage(uploadData, 'event-images')
        if (result?.error) {
            toast({ title: "Upload Failed", description: result.error, variant: "destructive" })
        } else if (result?.url) {
            setFormData(prev => ({ ...prev, images: [...prev.images, result.url!] }))
            toast({ title: "Upload Success", description: "Image added to gallery." })
        }
        setIsUploading(false)
    }

    const removeImage = (index: number) => {
        setFormData(prev => {
            const newImages = [...prev.images]
            newImages.splice(index, 1)
            return { ...prev, images: newImages }
        })
    }

    const openCreateDialog = () => {
        setEditingId(null)
        setFormData({
            title: '', event_date: new Date().toISOString().split('T')[0], short_description: '', full_summary: '',
            registration_link: '', registration_date: '', registration_open: 'false', published: 'false', images: []
        })
        setIsOpen(true)
    }

    const openEditDialog = (event: any) => {
        setEditingId(event.id)
        setFormData({
            title: event.title || '',
            event_date: event.event_date ? new Date(event.event_date).toISOString().split('T')[0] : '',
            short_description: event.short_description || '',
            full_summary: event.full_summary || '',
            registration_link: event.registration_link || '',
            registration_date: event.registration_date ? new Date(event.registration_date).toISOString().split('T')[0] : '',
            registration_open: event.registration_open ? 'true' : 'false',
            published: event.published ? 'true' : 'false',
            images: event.images || []
        })
        setIsOpen(true)
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        const submitData = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'images') {
                (value as string[]).forEach(img => submitData.append('images', img))
            } else {
                submitData.append(key, value as string)
            }
        })

        let result
        if (editingId) result = await updateEvent(editingId, submitData)
        else result = await createEvent(submitData)

        if (result?.error) toast({ title: "Error", description: result.error, variant: "destructive" })
        else {
            toast({ title: "Success", description: "Event saved successfully." })
            setIsOpen(false)
            fetchEvents()
        }
        setIsSaving(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return
        const result = await deleteEvent(id)
        if (result?.error) toast({ title: "Error", description: result.error, variant: "destructive" })
        else {
            toast({ title: "Deleted", description: "Event removed." })
            fetchEvents()
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-3xl font-bold text-[#1B3C53]">Events</h1>
                <Button onClick={openCreateDialog} className="bg-[#1B3C53] hover:bg-[#234C6A]">
                    <Plus className="h-4 w-4 mr-2" /> New Event
                </Button>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {events.length === 0 ? (
                                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">No events found.</td></tr>
                            ) : events.map((event) => (
                                <tr key={event.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{event.title}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(event.event_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {event.published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => openEditDialog(event)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingId ? 'Edit Event' : 'Create Event'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="space-y-4 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 col-span-2 md:col-span-1">
                                <Label>Event Title *</Label>
                                <Input name="title" value={formData.title} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2 col-span-2 md:col-span-1">
                                <Label>Event Date *</Label>
                                <Input type="date" name="event_date" value={formData.event_date} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Short Description *</Label>
                            <Textarea name="short_description" value={formData.short_description} onChange={handleInputChange} required rows={2} />
                        </div>

                        <div className="space-y-2">
                            <Label>Full Summary (Markdown supported)</Label>
                            <Textarea name="full_summary" value={formData.full_summary} onChange={handleInputChange} rows={6} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Registration Link</Label>
                                <Input name="registration_link" value={formData.registration_link} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label>Registration Deadline Date</Label>
                                <Input type="date" name="registration_date" value={formData.registration_date} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label>Registration Open</Label>
                                <select
                                    name="registration_open"
                                    value={formData.registration_open}
                                    onChange={handleInputChange}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                >
                                    <option value="false">Closed</option>
                                    <option value="true">Open</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>Visibility Status *</Label>
                                <select
                                    name="published"
                                    value={formData.published}
                                    onChange={handleInputChange}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                >
                                    <option value="false">Draft (Hidden)</option>
                                    <option value="true">Published</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2 border-t pt-4">
                            <Label>Event Gallery Images ({isUploading ? 'Uploading...' : 'Upload'})</Label>
                            <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} disabled={isUploading} />

                            {formData.images.length > 0 && (
                                <div className="grid grid-cols-4 gap-2 mt-2">
                                    {formData.images.map((img, idx) => (
                                        <div key={idx} className="relative group">
                                            <div className="h-16 w-full rounded border overflow-hidden relative">
                                                <img src={img} alt="upload preview" className="object-cover h-full w-full" />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <DialogFooter className="mt-6 pt-4 border-t">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isSaving || isUploading} className="bg-[#1B3C53]">
                                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Event
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

// X icon for image deletion inside dialog
const X = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
)
