import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <Card className="bg-gray-800/60 border-gray-700 text-center flex flex-col">
            <CardHeader>
                <div className="mx-auto bg-green-500/10 text-green-400 p-4 rounded-full w-fit">
                   {icon}
                </div>
                <CardTitle className="mt-4">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-gray-400">{description}</p>
            </CardContent>
        </Card>
    );
}
