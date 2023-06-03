import { Banner } from '@shopify/polaris';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useState, useEffect } from "react";

// Work in progress
export default function OrderCount() {
    const fetch = useAuthenticatedFetch();
    const [isLoading, setIsLoading] = useState(true);
    let orderCount = 0;

    const {
        data,
        refetch: refetchProductCount,
        isLoading: isLoadingCount,
        } = useAppQuery({
        url: "/api/orders/count",
        reactQueryOptions: {
            onSuccess: () => {
            setIsLoading(false);
            },
        },
    });



    useEffect(() => {
        const handlePopulate = async () => {
            setIsLoading(true);
            const response = await fetch("/api/orders/count");
            console.log('response: ', response);

            if (response.ok) {
                await refetchProductCount();
            } else {
                setIsLoading(false);
            }
        };


        handlePopulate();
    }, []); // Empty dependency array ensures that the effect runs only once on component mount
    
    console.log('data: ', data);

    return (
        <Banner title="Order count">
            <p>
                Your estimated order count the last 30 days is {orderCount}.
            </p>
        </Banner>
    );
}