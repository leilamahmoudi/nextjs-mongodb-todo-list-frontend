const Delete = ({ data }) => {
  return (
    <div className="py-48  px-36">
      <div className="flex flex-col mx-auto space-y-6 w-max">
        <h1 className="background-color red">Test: {data}</h1>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://nextjs-mongodb-todo-list-backe.herokuapp.com/api/tasks`
  );
  const data: any = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Delete;
