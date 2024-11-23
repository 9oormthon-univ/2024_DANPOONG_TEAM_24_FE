interface recipeItemProps {
  name: string
  price: string
  description: string
}

export default function RecipeItem({
  name,
  price,
  description,
}: recipeItemProps) {
  return (
    <div className="px-5 py-[10px] border border-200 rounded-xl">
      <div className="flex flex-col gap-1 font-SB00">
        <div className="text-sm text-black">{name}</div>
        <div className="text-xs text-500">{price}</div>
        <div className="text-[10px] text-400">{description}</div>
      </div>
    </div>
  )
}
