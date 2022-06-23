export async function getServerSideProps() {
  const res = await fetch(
    `https://nextjs-mongodb-todo-list-backe.herokuapp.com/api/todos`
  );
  const data = await res.json();
  console.log("GGGGG", data[0].task);
  return { props: { data } };
}

// // This gets called on every request
// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`https://nextjs-mongodb-todo-list-backe.herokuapp.com/api/todos`);
//   const data = await res.json();
//   console.log("GGGGG", data[0].task);

//   // Pass data to the page via props
//   return { props: { data } };
// }
// // This gets called on every request
// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`https://nextjs-mongodb-todo-list-backe.herokuapp.com/api/todos`);
//   const data = await res.json();
//   console.log("GGGGG", data[0].task);

//   // Pass data to the page via props
//   return { props: { data } };
// }
