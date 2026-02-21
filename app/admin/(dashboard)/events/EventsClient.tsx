'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createEvent, updateEvent, deleteEvent } from './actions'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EventsClient({ initialEvents }: { initialEvents: any[] }) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const formRef = useRef<HTMLFormElement>(null)

    // Form states
    const [title, setTitle] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [shortDescription, setShortDescription] = useState('')
    const [fullSummary, setFullSummary] = useState('')
    const [registrationOpen, setRegistrationOpen] = useState(false)
    const [registrationDate, setRegistrationDate] = useState('')
    const [published, setPublished] = useState(false)
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null)

    const handleOpenCreate = () => {
        setEditingId(null)
        setTitle('')
        setEventDate('')
        setShortDescription('')
        setFullSummary('')
        setRegistrationOpen(false)
        setRegistrationDate('')
        setPublished(false)
        setExistingImageUrl(null)
        setIsFormOpen(true)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOpenEdit = (event: any) => {
        setEditingId(event.id)
        setTitle(event.title || '')
        setEventDate(event.eventDate ? new Date(event.eventDate).toISOString().split('T')[0] : '')
        setShortDescription(event.shortDescription || '')
        setFullSummary(event.fullSummary || '')
        setRegistrationOpen(event.registrationOpen || false)
        setRegistrationDate(event.registrationDate ? new Date(event.registrationDate).toISOString().split('T')[0] : '')
        setPublished(event.published || false)
        setExistingImageUrl(event.images && event.images.length > 0 ? event.images[0] : null)
        setIsFormOpen(true)
    }

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true)
        formData.append('registrationOpen', registrationOpen.toString())
        formData.append('published', published.toString())
        if (existingImageUrl) {
            formData.append('existingImageUrl', existingImageUrl)
        }

        const res = editingId
            ? await updateEvent(editingId, formData)
            : await createEvent(formData)

        if (res?.error) {
            toast({ title: 'Error', description: res.error, variant: 'destructive' })
        } else {
            toast({ title: 'Success', description: 'Event saved successfully.' })
            setIsFormOpen(false)
        }
        setIsLoading(false)
    }

    const handleDelete = async (id: string, title: string) => {
        if (confirm(`Delete event "${title}"?`)) {
            const res = await deleteEvent(id)
            if (res?.error) toast({ title: 'Error', description: res.error, variant: 'destructive' })
            else toast({ title: 'Deleted', description: 'Event deleted.' })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[#1B3C53]">Manage Events</h1>
                {!isFormOpen && (
                    <Button onClick={handleOpenCreate} className="bg-[#234C6A]">
                        + New Event
                    </Button>
                )}
            </div>

            {isFormOpen ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Event' : 'Create Event'}</h2>
                    <form ref={formRef} action={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Title</Label>
                            <Input name="title" value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Event Date</Label>
                                <Input type="date" name="eventDate" value={eventDate} onChange={e => setEventDate(e.target.value)} required />
                            </div>
                            <div className="flex items-end pb-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                                    <span className="font-semibold">Published to site</span>
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-end pb-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={registrationOpen} onChange={e => setRegistrationOpen(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                                    <span className="font-semibold">Registration Open</span>
                                </label>
                            </div>
                            <div>
                                <Label>Registration Deadline</Label>
                                <Input type="date" name="registrationDate" value={registrationDate} onChange={e => setRegistrationDate(e.target.value)} disabled={!registrationOpen} />
                            </div>
                        </div>

                        <div>
                            <Label>Short Description</Label>
                            <Textarea name="shortDescription" value={shortDescription} onChange={e => setShortDescription(e.target.value)} required />
                        </div>

                        <div>
                            <Label>Full Summary</Label>
                            <Textarea name="fullSummary" value={fullSummary} onChange={e => setFullSummary(e.target.value)} rows={6} />
                        </div>

                        <div>
                            <Label>Primary Event Image (max 5MB)</Label>
                            <Input type="file" name="image" accept="image/*" />
                            {existingImageUrl && (
                                <div className="mt-4">
                                    <p className="text-sm font-semibold mb-2">Current Image:</p>
                                    <div className="relative w-48 h-32 rounded overflow-hidden border">
                                        <Image src={existingImageUrl} alt="Event" fill className="object-cover" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isLoading} className="bg-[#1B3C53]">
                                {isLoading ? 'Saving...' : 'Save Event'}
                            </Button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#1B3C53]">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">Title</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">Date</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {initialEvents.map(e => (
                                <tr key={e.id}>
                                    <td className="px-6 py-4 font-semibold text-[#1B3C53] max-w-xs truncate">{e.title}</td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(e.eventDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 text-xs rounded-full ${e.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {e.published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleOpenEdit(e)}>Edit</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(e.id, e.title)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                            {initialEvents.length === 0 && (
                                <tr><td colSpan={4} className="text-center p-8 text-gray-500">No events found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
