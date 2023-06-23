import React, { useEffect, useState } from 'react'

const temp3 = () => {

  const [queries, setQueries] = useState({ search: '', name: '', url: '' });

  useEffect(() => {
    setQueries({ ...queries, ['search']: 'tempSearch', ['name']: 'tempName' });
  }, []);


  console.log('queries: ', queries);




  return (
    <div>
      nothing
    </div>
  )
}

export default temp3;