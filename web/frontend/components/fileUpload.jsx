import { DropZone, Thumbnail, Text, Card, BlockStack, Box, Spinner } from '@shopify/polaris';
import { NoteMinor } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import { useAuthenticatedFetch } from '../hooks';

export function FileUpload ({ onFileIdGenerated, label = null}) {
    const fetch = useAuthenticatedFetch();
    const [files, setFiles] = useState([]);
    const [isFileUploading, setIsFileUploading] = useState(false);

    const handleDropZoneDrop = useCallback(
        async (_dropFiles, acceptedFiles, _rejectedFiles) => {
            setIsFileUploading(true)
            setFiles((files) => [...files, ...acceptedFiles])
            const [{ name, size, type }] = acceptedFiles
            const response = await fetch('/api/branding/stage-upload', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, size, type }),
            })
            if (response.ok) {
                const { url, parameters } = await response.json()

                const formData = new FormData()

                parameters.forEach(({ name, value }) => {
                    formData.append(name, value)
                })

                formData.append('file', acceptedFiles[0])

                const saveResponse = await fetch(url, {
                    method: 'POST',
                    body: formData
                })
                if (saveResponse.ok) {
                    const key = parameters.find(p => p.name === 'key')
                    const link = `${url}${key.value}`

                    const uploadFileRes = await fetch('/api/branding/upload', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ name, url: link }),
                    })

                    const { id, alt } = await uploadFileRes.json()
                    onFileIdGenerated(id)
                    setIsFileUploading(false)
                }

            }
        },
        [],
    );

    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    const fileUpload = !files.length && <DropZone.FileUpload />;
    const uploadedFiles = files.length > 0 && isFileUploading === false && (
        <div style={{ padding: '0' }}>
            {files.map((file, index) => (
                <Box paddingBlockStart="500" key={index}>
                    <BlockStack inlineAlign="center" align="center">
                        <Thumbnail
                            size="small"
                            alt={file.name}
                            source={
                                validImageTypes.includes(file.type)
                                    ? window.URL.createObjectURL(file)
                                    : NoteMinor
                            }
                        />
                        <div>
                            {file.name}{' '}
                            <Text variant="bodySm" as="p">
                                {file.size} bytes
                            </Text>
                        </div>
                    </BlockStack>
                </Box>
            ))}
        </div>
    );

    return (
        <BlockStack gap="200">
            <DropZone
                label={label}
                allowMultiple={false}
                onDrop={handleDropZoneDrop}
                errorOverlayText="File type must be .png"
                actionHint="Accepts .png"
                accept="image/png"
                type="image">
                {uploadedFiles}
                {fileUpload}
                {isFileUploading == true && <Box paddingBlockStart="1600">
                    <BlockStack align='center' inlineAlign='center'>
                        <Spinner size="small" />
                    </BlockStack>
                </Box>}
            </DropZone>
            {files.length > 0 && isFileUploading === false && <Text variant='bodySm' tone='subdued'>To save changes, Please hit the Save button at top right corner!</Text>}
        </BlockStack>
    );
}
