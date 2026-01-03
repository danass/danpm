'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { useCollapse } from '../contexts/CollapseContext'
import { useEdit } from '../contexts/EditContext'
import EditableText from './EditableText'
import RichEditableText from './RichEditableText'

export default function Additional() {
    const { t, languages, activities, updateData, isLoading } = useLanguage()
    const { isCompact } = useCollapse()
    const { isEditMode, setHasChanges } = useEdit()

    // Wait for data to load
    if (isLoading) return null

    // Check if we have content to display
    const hasLanguages = languages?.text && languages.text.trim() !== ''
    const hasActivities = activities?.text && activities.text.trim() !== ''

    if (!isEditMode && !hasLanguages && !hasActivities) {
        return null
    }

    return (
        <section className={isCompact ? 'space-y-4' : 'space-y-6'}>
            {/* Languages Section */}
            {(hasLanguages || isEditMode) && (
                <div>
                    <h2 className={`${isCompact ? 'text-xl' : 'text-2xl'} font-medium text-slate-800 tracking-tight border-b border-slate-200 ${isCompact ? 'pb-2 mb-3' : 'pb-3 mb-4'}`}>
                        <EditableText
                            value={languages?.title || "Langues"}
                            onChange={(val) => {
                                updateData('languages.title', val)
                                setHasChanges(true)
                            }}
                            className="inline"
                        />
                    </h2>
                    <div className={`text-slate-700 leading-relaxed ${isCompact ? 'text-sm' : ''}`}>
                        {isEditMode ? (
                            <RichEditableText
                                value={languages?.text || ""}
                                onChange={(val) => {
                                    updateData('languages.text', val)
                                    setHasChanges(true)
                                }}
                                multiline={true}
                                className="block w-full"
                                tag="div"
                            />
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: languages?.text || '' }} />
                        )}
                    </div>
                </div>
            )}

            {/* Activities Section */}
            {(hasActivities || isEditMode) && (
                <div>
                    <h2 className={`${isCompact ? 'text-xl' : 'text-2xl'} font-medium text-slate-800 tracking-tight border-b border-slate-200 ${isCompact ? 'pb-2 mb-3' : 'pb-3 mb-4'}`}>
                        <EditableText
                            value={activities?.title || "Activités"}
                            onChange={(val) => {
                                updateData('activities.title', val)
                                setHasChanges(true)
                            }}
                            className="inline"
                        />
                    </h2>
                    <div className={`text-slate-700 leading-relaxed ${isCompact ? 'text-sm' : ''}`}>
                        {isEditMode ? (
                            <RichEditableText
                                value={activities?.text || ""}
                                onChange={(val) => {
                                    updateData('activities.text', val)
                                    setHasChanges(true)
                                }}
                                multiline={true}
                                className="block w-full"
                                tag="div"
                            />
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: activities?.text || '' }} />
                        )}
                    </div>
                </div>
            )}
        </section>
    )
}
