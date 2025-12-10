export default function Book({ params }: { params: { id: string } }) {
  return <div>{params.id}</div>;
}
