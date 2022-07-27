interface SectionProps {
  children: React.ReactNode
  className?: string
}

export const Section = (props: SectionProps) => {
  return (
    <div className={props.className || 'pt-10 sm:pt-0'}>
      <div className="mt-5 md:mt-0 md:col-span-2 max-w-4xl mx-auto">{props.children}</div>
    </div>
  )
}

export const Separator = () => {
  return (
    <div className="hidden sm:block max-w-4xl mx-auto" aria-hidden="true">
      <div className="py-8">
        <div className="border-t border-gray-200" />
      </div>
    </div>
  )
}
