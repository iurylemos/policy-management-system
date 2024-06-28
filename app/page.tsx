import InfoBoxWelcome from "@/src/client/components/atoms/InfoboxWelcome";
import Welcome from "@/src/client/components/organisms/Welcome";

const HomePage: React.FC = (): JSX.Element => {
  return (
    <main className="flex flex-col">
      <InfoBoxWelcome />
      <Welcome />
    </main>
  );
};

export default HomePage;
