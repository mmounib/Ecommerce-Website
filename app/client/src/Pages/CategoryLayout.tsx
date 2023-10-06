import { Outlet, useLocation } from 'react-router'

export default function CategoryLayout() {

  const {pathname} = useLocation()
  // Use a regular expression to extract the "anything" part
  const match = pathname.match(/\/category\/(.+)/);
  let result: string = '';
  // The extracted value is in match[1]
  if (match)
    result = match[1];
  const category = result.charAt(0).toUpperCase() + result.slice(1);
  
  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col gap-4 w-full h-80 bg-slate-200 justify-center items-center'>
        <h1 className='font-bold text-5xl'>{category}</h1>
        <p className='text-center w-1/3'>Turpis vel imperdiet nulla malesuada vulputate volutpat. Amet dolor mi lacus amet etiam nulla id.</p>
      </div>
      <Outlet />
    </div>
  )
}
