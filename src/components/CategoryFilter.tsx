
import { Button } from "@/components/ui/button";
import { categories } from "@/data/vendors";

interface CategoryFilterProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategoryFilter = ({ selectedCategory, setSelectedCategory }: CategoryFilterProps) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-3 text-center">Filter by Category</h2>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className="rounded-full"
        >
          All
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
