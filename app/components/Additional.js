'use client'

import { useLanguage } from '../contexts/LanguageContext'
import { useEdit } from '../contexts/EditContext'
import EditableText from './EditableText'

export default function Additional() {
    const { t, updateData } = useLanguage()
    const { isEditMode, setHasChanges } = useEdit()

    // Don't render if no content and not in edit mode
    if (!isEditMode && (!t.additional || !t.additional.text || t.additional.text.trim() === '')) {
        return null
    }

    return (
        <section>
            <h2 className="text-2xl font-medium text-slate-800 tracking-tight border-b border-slate-200 pb-3 mb-4">
                <EditableText
                    value={t.additional?.title || "Informations Complémentaires"}
                    onChange={(val) => {
                        updateData('additional.title', val)
                        setHasChanges(true)
                    }}
                    className="inline"
                />
            </h2>
            <p className="text-slate-700 leading-relaxed" itemProp="description">
                <EditableText
                    value={t.additional?.text || ""}
                    onChange={(val) => {
                        updateData('additional.text', val)
                        setHasChanges(true)
                    }}
                    className="inline"
                    multiline={true}
                />
            </p>
        </section>
    )
}
