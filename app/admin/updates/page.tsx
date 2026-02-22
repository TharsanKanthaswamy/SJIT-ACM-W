'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { createUpdate, editUpdate, deleteUpdate, uploadAdminImage } from '@/app/actions'
import { Loader2, Pencil, Trash2, Plus, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

export default function AdminUpdatesPage() {
    const [updates, setUpdates] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const { toast } = useToast()
    const supabase = createClient()

    const [formData, setFormData] = useState({
        title: '', description: '', imageUrl: '', date: '', published: 'false'
    })

    const fetchUpdates = async () => {
        setIsLoading(true)
        const { data } = await supabase.from('updates').select('*').order('date', { ascending: false })
        if (data) setUpdates(data)
        setIsLoading(false)
    }

    useEffect(() => { fetchUpdates() }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return
        setIsUploading(true)
        const file = e.target.files[0]
        const uploadData = new FormData()
        uploadData.append('image', file)

        const result = await uploadAdminImage(uploadData, 'updates-images')
        if (result?.error) toast({ title: "Upload Failed", description: result.error, variant: "destructive" })
        else if (result?.url) {
            setFormData(prev => ({ ...prev, imageUrl: result.url! }))
            toast({ title: "Upload Success", description: "Image uploaded successfully." })
        }
        setIsUploading(false)
    }

    const openCreateDialog = () => {
        setEditingId(null)
        setFormData({ title: '', description: '', imageUrl: '', date: new Date().toISOString().split('T')[0], published: 'false' })
        setIsOpen(true)
    }

    const openEditDialog = (update: any) => {
        setEditingId(update.id)
        setFormData({
            title: update.title || '',
            description: update.description || '',
            imageUrl: update.imageUrl || '',
            date: update.date ? new Date(update.date).toISOString().split('T')[0] : '',
            published: update.published ? 'true' : 'false'
        })
        setIsOpen(true)
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        const submitData = new FormData()
        Object.entries(formData).forEach(([key, value]) => submitData.append(key, value as string))

        let result
        if (editingId) result = await editUpdate(editingId, submitData)
        else result = await createUpdate(submitData)

        if (result?.error) toast({ title: "Error", description: result.error, variant: "destructive" })
        else {
            toast({ title: "Success", description: "Update saved successfully." })
            setIsOpen(false)
            fetchUpdates()
        }
        setIsSaving(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this update?')) return
        const result = await deleteUpdate(id)
        if (result?.error) toast({ title: "Error", description: result.error, variant: "destructive" })
        else {
            toast({ title: "Deleted", description: "Update removed." })
            fetchUpdates()
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-3xl font-bold text-[#1B3C53]">News & Updates</h1>
                <Button onClick={openCreateDialog} className="bg-[#1B3C53] hover:bg-[#234C6A]">
                    <Plus className="h-4 w-4 mr-2" /> New Update
                </Button>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                            <tr>
                                <th className="px-6 py-4">Image</th>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {updates.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">No updates found.</td></tr>
                            ) : updates.map((update) => (
                                <tr key={update.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {update.imageUrl ? (
                                            <div className="relative h-12 w-16 rounded overflow-hidden border">
                                                <Image src={update.imageUrl} alt={update.title} fill className="object-cover" />
                                            </div>
                                        ) : (
                                            <div className="h-12 w-16 rounded bg-gray-200 flex items-center justify-center">
                                                <ImageIcon className="h-4 w-4 text-gray-400" />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 line-clamp-2 max-w-xs">{update.title}</td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(update.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${update.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {update.published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => openEditDialog(update)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(update.id)}>
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
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{editingId ? 'Edit Update' : 'New Update'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label>Update Title *</Label>
                            <Input name="title" value={formData.title} onChange={handleInputChange} required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Date *</Label>
                                <Input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
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

                        <div className="space-y-2">
                            <Label>Description *</Label>
                            <Textarea name="description" value={formData.description} onChange={handleInputChange} required rows={4} />
                        </div>

                        <div className="space-y-2 border-t pt-4">
                            <Label>Cover Image ({isUploading ? 'Uploading...' : 'Upload'})</Label>
                            <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} disabled={isUploading} />
                            {formData.imageUrl && (
                                <div className="mt-2 relative h-32 w-48 rounded overflow-hidden border">
                                    <img src={formData.imageUrl} alt="preview" className="object-cover h-full w-full" />
                                </div>
                            )}
                        </div>

                        <DialogFooter className="mt-6 pt-4 border-t">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isSaving || isUploading} className="bg-[#1B3C53]">
                                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Update
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
