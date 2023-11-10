import { Redirect } from "@shopify/app-bridge/actions";
import { Box, Modal, Spinner } from "@shopify/polaris";
import { useEffect, useState } from "react";

export function OverviewModal ({ displayVideoGuide, handleVideoGuideClick, redirect }) {
    const [width, setWidth] = useState(window.innerWidth);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    return (
        <Modal
            large
            open={displayVideoGuide}
            onClose={handleVideoGuideClick}
            title="An Overview"
            secondaryActions={[
                {
                    content: "Learn more",
                    onAction: () => {
                        redirect.dispatch(
                            Redirect.Action.APP,
                            "/how-to-use"
                        )
                        handleVideoGuideClick()
                    }
                },
            ]}
        >
            <Modal.Section>
                <Box
                    position="relative"
                    width="100%"
                    minHeight={`500px`}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "500px",
                            zIndex: 1,
                            position: "absolute",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    >
                        <Spinner size="large" />
                    </div>
                    <iframe
                        src="https://www.loom.com/embed/6b259d6d5363409fb50f02cc9e628968?sid=e53f57c6-3386-48bf-82f9-2da4d710abcf?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
                        frameBorder="0"
                        allowFullScreen
                        style={{
                            width: "100%",
                            height: "500px",
                            zIndex: 2,
                            position: "relative",
                        }}
                    ></iframe>
                </Box>
            </Modal.Section>
        </Modal>
    );
}
