import { useEffect, useState } from "react";

export async function getServerSideProps( ctx ) {

  // let temp = JSON.parse(ctx);

  console.log('ctx query is: ', ctx.resolvedUrl, typeof ctx.resolvedUrl);
  const objArr = [{a: 'something meaningless', b: 'something more meaningless'}];

  return {
    props: {
      'objArr': objArr
    }

  };
}

export default function Home({ objArr }) {

  if (typeof window !== 'undefined') {
    localStorage.setItem('objArr', JSON.stringify(objArr));
  }

  return (
    <u>

    </u>
  );

}
