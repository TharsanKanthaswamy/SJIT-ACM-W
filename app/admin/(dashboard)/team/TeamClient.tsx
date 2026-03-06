'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createTeamMember, updateTeamMember, deleteTeamMember } from './actions'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TeamClient({ initialTeam }: { initialTeam: any[] }) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const formRef = useRef<HTMLFormElement>(null)

    // Form states
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [category, setCategory] = useState('student')
    const [orderPosition, setOrderPosition] = useState('')
    const [linkedinUrl, setLinkedinUrl] = useState('')
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null)

    const handleOpenCreate = () => {
        setEditingId(null)
        setName('')
        setPosition('')
        setCategory('student')
        setOrderPosition('')
        setLinkedinUrl('')
        setExistingImageUrl(null)
        setIsFormOpen(true)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOpenEdit = (member: any) => {
        setEditingId(member.id)
        setName(member.name || '')
        setPosition(member.position || '')
        setCategory(member.category || 'student')
        setOrderPosition(member.order_position?.toString() || '')
        setLinkedinUrl(member.linkedin_url || '')
        setExistingImageUrl(member.image_url)
        setIsFormOpen(true)
    }

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true)
        if (existingImageUrl) {
            formData.append('existingImageUrl', existingImageUrl)
        }
        formData.append('linkedinUrl', linkedinUrl)
        formData.append('category', category)

        const res = editingId
            ? await updateTeamMember(editingId, formData)
            : await createTeamMember(formData)

        if (res?.error) {
            toast({ title: 'Error', description: res.error, variant: 'destructive' })
        } else {
            toast({ title: 'Success', description: 'Team member saved successfully.' })
            setIsFormOpen(false)
        }
        setIsLoading(false)
    }

    const handleDelete = async (id: string, memberName: string) => {
        if (confirm(`Delete member "${memberName}"?`)) {
            const res = await deleteTeamMember(id)
            if (res?.error) toast({ title: 'Error', description: res.error, variant: 'destructive' })
            else toast({ title: 'Deleted', description: 'Member deleted.' })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[#1B3C53]">Manage Team</h1>
                {!isFormOpen && (
                    <Button onClick={handleOpenCreate} className="bg-[#234C6A]">
                        + Add Member
                    </Button>
                )}
            </div>

            {isFormOpen ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
                    <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Team Member' : 'Add Team Member'}</h2>
                    <form ref={formRef} action={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input name="name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>

                        <div>
                            <Label>Position</Label>
                            <Input name="position" value={position} onChange={e => setPosition(e.target.value)} required />
                        </div>

                        <div>
                            <Label>Category</Label>
                            <select
                                name="category"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="student">Student</option>
                                <option value="faculty">Faculty</option>
                            </select>
                        </div>

                        <div>
                            <Label>Order Position</Label>
                            <Input type="number" name="orderPosition" value={orderPosition} onChange={e => setOrderPosition(e.target.value)} placeholder="Lower numbers appear first" />
                        </div>

                        <div>
                            <Label>Profile Image (max 5MB)</Label>
                            <Input type="file" name="image" accept="image/*" />
                            {existingImageUrl && (
                                <div className="mt-4">
                                    <p className="text-sm font-semibold mb-2">Current Image:</p>
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden border">
                                        <Image src={existingImageUrl} alt="Profile" fill className="object-cover" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <Label>LinkedIn URL</Label>
                            <Input type="url" name="linkedinUrl" value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)} placeholder="https://www.linkedin.com/in/..." />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isLoading} className="bg-[#1B3C53]">
                                {isLoading ? 'Saving...' : 'Save Member'}
                            </Button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#1B3C53]">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">Member</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase">Position</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-white uppercase">Order</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-white uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {initialTeam.map(t => (
                                <tr key={t.id}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {t.image_url ? (
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                                    <Image src={t.image_url} alt={t.name} fill className="object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                                                    {t.name.charAt(0)}
                                                </div>
                                            )}
                                            <span className="font-semibold text-[#1B3C53]">{t.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{t.position}</td>
                                    <td className="px-6 py-4 text-center font-medium">{t.order_position ?? '-'}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleOpenEdit(t)}>Edit</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(t.id, t.name)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                            {initialTeam.length === 0 && (
                                <tr><td colSpan={4} className="text-center p-8 text-gray-500">No team members found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
