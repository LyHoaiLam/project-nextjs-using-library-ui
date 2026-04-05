interface SkeletonProps {
  className?: string
}

export function Skeleton({
  className = "",
  ...props
}: SkeletonProps & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`bg-gray-200 animate-pulse rounded-md ${className}`} {...props} />
}

export default function Loading() {
  return (
    <div className="w-full">
      <div className="w-full max-w-4xl mx-auto flex flex-col justify-center items-center">
        <Skeleton className="w-full h-120 rounded-lg mt-10" />
        <Skeleton className="w-full h-120 rounded-lg mt-20" />
      </div>
    </div>
  )
}
