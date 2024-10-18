import { Loader2 } from "lucide-react"

export default function BlogSkeletonLoader() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      {/* Title */}
      <div className="h-10 bg-gray-200 rounded-md w-3/4"></div>

      {/* Paragraph */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>

      {/* Image placeholder */}
      <div className="h-64 bg-gray-200 rounded-md"></div>

      {/* Subheading */}
      <div className="h-8 bg-gray-200 rounded-md w-1/2"></div>

      {/* Paragraph */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>

      {/* List */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Subheading */}
      <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>

      {/* Paragraph */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>

      {/* List */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-6 bg-gray-200 rounded-full w-16"></div>
        ))}
      </div>

      {/* Loading indicator */}
      <div className="flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    </article>
  )
}