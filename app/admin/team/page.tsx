'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog'
import { createTeamMember, updateTeamMember, deleteTeamMember, uploadAdminImage } from '@/app/actions'
import { Loader2, Pencil, Trash2, Plus, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

export default function AdminTeamPage() {
    const [team, setTeam] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const { toast } = useToast()
    const supabase = createClient()

    // Form State
    const [formData, setFormData] = useState({
        name: '', position: '', image_url: '', order_position: '0',
        linkedin_url: '', twitter_url: '', instagram_url: '', facebook_url: ''
    })

    const fetchTeam = async () => {
        setIsLoading(true)
        const { data } = await supabase.from('team_members').select('*').order('order_position', { ascending: true })
        if (data) setTeam(data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchTeam()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        setIsUploading(true)
        const file = e.target.files[0]
        const uploadData = new FormData()
        uploadData.append('image', file)

        const result = await uploadAdminImage(uploadData, 'team-images')
        if (result?.error) {
            toast({ title: "Upload Failed", description: result.error, variant: "destructive" })
        } else if (result?.url) {
            setFormData(prev => ({ ...prev, image_url: result.url }))
            toast({ title: "Upload Success", description: "Image uploaded successfully." })
        }
        setIsUploading(false)
    }

    const openCreateDialog = () => {
        setEditingId(null)
        setFormData({ name: '', position: '', image_url: '', order_position: '0', linkedin_url: '', twitter_url: '', instagram_url: '', facebook_url: '' })
        setIsOpen(true)
    }

    const openEditDialog = (member: any) => {
        setEditingId(member.id)
        setFormData({
            name: member.name || '', position: member.position || '',
            image_url: member.image_url || '', order_position: (member.order_position || 0).toString(),
            linkedin_url: member.linkedin_url || '', twitter_url: member.twitter_url || '',
            instagram_url: member.instagram_url || '', facebook_url: member.facebook_url || ''
        })
        setIsOpen(true)
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        const submitData = new FormData()
        Object.entries(formData).forEach(([key, value]) => submitData.append(key, value))

        let result
        if (editingId) {
            result = await updateTeamMember(editingId, submitData)
        } else {
            result = await createTeamMember(submitData)
        }

        if (result?.error) {
            toast({ title: "Error", description: result.error, variant: "destructive" })
        } else {
            toast({ title: "Success", description: `Team member ${editingId ? 'updated' : 'created'}.` })
            setIsOpen(false)
            fetchTeam()
        }
        setIsSaving(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this team member?')) return
        const result = await deleteTeamMember(id)
        if (result?.error) {
            toast({ title: "Error", description: result.error, variant: "destructive" })
        } else {
            toast({ title: "Deleted", description: "Team member removed." })
            fetchTeam()
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-3xl font-bold text-[#1B3C53]">Team Members</h1>
                <Button onClick={openCreateDialog} className="bg-[#1B3C53] hover:bg-[#234C6A]">
                    <Plus className="h-4 w-4 mr-2" /> Add Member
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
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Position</th>
                                <th className="px-6 py-4 text-center">Order</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {team.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">No team members found.</td></tr>
                            ) : team.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {member.image_url ? (
                                            <div className="relative h-10 w-10 rounded-full overflow-hidden border">
                                                <Image src={member.image_url} alt={member.name} fill className="object-cover" />
                                            </div>
                                        ) : (
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <ImageIcon className="h-4 w-4 text-gray-400" />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                                    <td className="px-6 py-4 text-gray-500">{member.position}</td>
                                    <td className="px-6 py-4 text-center">{member.order_position}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => openEditDialog(member)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(member.id)}>
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
                        <DialogTitle>{editingId ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="space-y-4 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Name *</Label>
                                <Input name="name" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Position / Role *</Label>
                                <Input name="position" value={formData.position} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Display Order *</Label>
                                <Input type="number" name="order_position" value={formData.order_position} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Profile Image ({isUploading ? 'Uploading...' : 'Upload'})</Label>
                                <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} disabled={isUploading} />
                                {formData.image_url && <p className="text-xs text-green-600 truncate mt-1">Image loaded.</p>}
                            </div>
                        </div>

                        <div className="pt-4 border-t space-y-4">
                            <h4 className="font-semibold text-sm text-gray-500">Social Links (Optional)</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>LinkedIn URL</Label>
                                    <Input name="linkedin_url" value={formData.linkedin_url} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Twitter URL</Label>
                                    <Input name="twitter_url" value={formData.twitter_url} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Instagram URL</Label>
                                    <Input name="instagram_url" value={formData.instagram_url} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Facebook URL</Label>
                                    <Input name="facebook_url" value={formData.facebook_url} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isSaving || isUploading} className="bg-[#1B3C53]">
                                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Member
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
