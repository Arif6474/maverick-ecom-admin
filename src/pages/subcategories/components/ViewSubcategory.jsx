import { Button } from '@/components/custom/button';
import { Label } from '@/components/ui/label';
import { IconX, IconLoader } from '@tabler/icons-react';
import { useSingleSubcategoryQuery } from '@/redux/features/subcategories/subcategoryApi';

const ViewSubcategory = ({ setShowItem, targetID }) => {
    const { data: subcategory, isLoading } = useSingleSubcategoryQuery({ id: targetID });

    if (isLoading) return (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50">
            <div className="h-full w-full max-w-md bg-background p-6 flex items-center justify-center">
                <IconLoader className="animate-spin" />
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50">
            <div className="h-full w-full max-w-md bg-background p-6 shadow-xl animate-in slide-in-from-right overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Subcategory Details</h2>
                    <Button variant="ghost" size="icon" onClick={() => setShowItem(false)}>
                        <IconX className="h-5 w-5" />
                    </Button>
                </div>

                <div className="space-y-6">
                    {subcategory?.image && (
                        <div className="w-full h-48 rounded-lg overflow-hidden border">
                            <img src={subcategory.image} alt={subcategory.name} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="space-y-1">
                        <Label className="text-muted-foreground">Name</Label>
                        <p className="font-medium text-lg">{subcategory?.name}</p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-muted-foreground">Parent Category</Label>
                        <p className="font-medium">{subcategory?.category?.name || 'N/A'}</p>
                    </div>

                    <div className="space-y-1">
                        <Label className="text-muted-foreground">Description</Label>
                        <p className="text-sm leading-relaxed">{subcategory?.description || 'No description'}</p>
                    </div>

                    <div className="pt-4">
                        <Button className="w-full" variant="outline" onClick={() => setShowItem(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewSubcategory;
