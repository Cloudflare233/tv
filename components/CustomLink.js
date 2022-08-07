import Link from 'next/link'

export default function CustomLink({ as, href, ...otherProps }) {
  return (
    <>
      <Link as={as} href={href}>
        <a className='text-blue-400 dark:text-blue-600 underline' {...otherProps} />
      </Link>
    </>
  )
}
