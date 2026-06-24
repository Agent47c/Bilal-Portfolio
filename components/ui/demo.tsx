import { CircularRevealHeading } from "@/components/ui/circular-reveal-heading";

const items = [
    {
        text: "STRATEGY",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
    },
    {
        text: "DESIGN",
        image: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=600&q=80"
    },
    {
        text: "GROWTH",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80"
    },
    {
        text: "INNOVATION",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80"
    }
];

export function MediumCircularRevealHeadingDemo() {
    return (
        <div className="p-16 min-h-screen flex items-center justify-center bg-gray-50">
            <CircularRevealHeading
                items={items}
                centerText={
                    <div className="text-xl font-bold text-[#444444]">
                        MISHRA HUB
                    </div>
                }
                size="md"
            />
        </div>
    );
}

export function LargeCircularRevealHeadingDemo() {
    return (
        <div className="p-16 min-h-screen flex items-center justify-center bg-gray-50">
            <CircularRevealHeading
                items={items}
                centerText={
                    <div className="text-2xl font-bold text-[#444444]">
                        MISHRA HUB
                    </div>
                }
                size="lg"
            />
        </div>
    );
}

export function SmallCircularRevealHeadingDemo() {
    return (
        <div className="p-16 min-h-screen flex items-center justify-center bg-gray-50">
            <CircularRevealHeading
                items={items}
                centerText={
                    <div className="text-sm font-bold text-[#444444]">
                        MISHRA HUB
                    </div>
                }
                size="sm"
            />
        </div>
    );
}
