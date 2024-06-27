import Welcome from "@/src/client/components/organisms/Welcome";

const HomePage: React.FC = (): JSX.Element => {
  return (
    <main className="flex flex-col">
      <Welcome />
    </main>
  );
};

export default HomePage;
