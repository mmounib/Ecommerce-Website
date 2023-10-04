import { Outlet } from 'react-router'

export default function CategoryLayout() {
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <h1>Kids</h1>
        <p className='text-center'>Turpis vel imperdiet nulla malesuada vulputate volutpat. Amet dolor mi lacus amet etiam nulla id.</p>
      </div>
      <section className='flex'>
        <div>
          {/* filter section */}
        </div>
        <Outlet /> {/* products list */}
      </section>
    </>
  )
}
