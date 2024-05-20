export default function MainLayout({ children }) {
  return (
    <>
      <div className="lg:w-9/12 md:w-[90%] h-[100vh] w-[95%] mx-auto mt-9 flex flex-col md:flex-row justify-between items-center">
        {children}
      </div>
    </>
  )
}
