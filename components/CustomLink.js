import Link from 'next/link'

export default function CustomLink({ as, href, ...otherProps }) {
  return (
    <>
      <Link as={as} href={href}>
        <a className='text-blue-500 underline' {...otherProps} />
      </Link>
    </>
  )
}
