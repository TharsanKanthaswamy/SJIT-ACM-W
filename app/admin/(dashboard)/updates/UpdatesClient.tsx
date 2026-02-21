'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createUpdate, updateUpdate, deleteUpdate } from './actions'
import { useToast } from '@/hooks/use-toast'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function UpdatesClient({ initialUpdates }: { initialUpdates: any[] }) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const formRef = useRef<HTMLFormElement>(null)

    // Form states
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [date, setDate] = useState('')
    const [published, setPublished] = useState(false)
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null)

    const handleOpenCreate = () => {
        setEditingId(null)
        setTitle('')
        setDescription('')
        setContent('')
        setDate('')
        setPublished(false)
        setExistingImageUrl(null)
        setIsFormOpen(true)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOpenEdit = (update: any) => {
        setEditingId(update.id)
        setTitle(update.title || '')
        setDescription(update.description || '')
        setContent(update.content || '')
        setDate(update.date ? new Date(update.date).toISOString().split('T')[0] : '')
        setPublished(update.published || false)
        setExistingImageUrl(update.imageUrl)
        setIsFormOpen(true)
    }

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true)
        formData.append('published', published.toString())
        if (existingImageUrl) {
            formData.append('existingImageUrl', existingImageUrl)
        }

        const res = editingId
            ? await updateUpdate(editingId, formData)
            : await createUpdate(formData)

        if (res?.error) {
            toast({ title: 'Error', description: res.error, variant: 'destructive' })
        } else {
            toast({ title: 'Success', description: 'Update saved successfully.' })
            setIsFormOpen(false)
        }
        setIsLoading(false)
    }

    const handleDelete = async (id: string, title: string) => {
        if (confirm(`Delete "${title}"?`)) {
            const res = await deleteUpdate(id)
            if (res?.error) toast({ title: 'Error', description: res.error, variant: 'destructive' })
            else toast({ title: 'Deleted', description: 'Update deleted.' })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[#1B3C53]">Manage Updates</h1>
                {!isFormOpen && (
                    <Button onClick={handleOpenCreate} className="bg-[#234C6A]">
                        + New Update
                    </Button>
                )}
            </div>

            {isFormOpen ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Update' : 'Create Update'}</h2>
                    <form ref={formRef} action={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Title</Label>
                            <Input name="title" value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Date</Label>
                                <Input type="date" name="date" value={date} onChange={e => setDate(e.target.value)} required />
                            </div>
                            <div className="flex items-end pb-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} className="w-5 h-5 rounded border-gray-300" />
                                    <span className="font-semibold">Published to site</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <Label>Short Description</Label>
                            <Textarea name="description" value={description} onChange={e => setDescription(e.target.value)} required />
                        </div>

                        <div>
                            <Label>Content (Markdown/Text)</Label>
                            <Textarea name="content" value={content} onChange={e => setContent(e.target.value)} rows={8} />
                        </div>

                        <div>
                            <Label>Image Header (max 5MB)</Label>
                            <Input type="file" name="image" accept="image/*" />
                            {existingImageUrl && (
                                <div className="mt-2 text-sm text-gray-500">Current image is set. Upload new to replace.</div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isLoading} className="bg-[#1B3C53]">
                                {isLoading ? 'Saving...' : 'Save Update'}
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
                            {initialUpdates.map(u => (
                                <tr key={u.id}>
                                    <td className="px-6 py-4 font-semibold text-[#1B3C53]">{u.title}</td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(u.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 text-xs rounded-full ${u.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {u.published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleOpenEdit(u)}>Edit</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(u.id, u.title)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                            {initialUpdates.length === 0 && (
                                <tr><td colSpan={4} className="text-center p-8 text-gray-500">No updates found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
