import SslCheckerForm from "./ssl-checker-form";

const HeroSection = ({}) => {
  return (
    <section className="container mx-auto px-6 flex items-center justify-center flex-col pt-40">
      <h1 className="heading-1 mb-3 text-center">
        Verify Your Domain’s SSL Certificate in Seconds
      </h1>
      <p className="text-sm text-muted-foreground text-center">
        Check the validity and configuration of your SSL certificate with our
        easy-to-use tool.
      </p>
      <div className="mt-9 w-full">
        <SslCheckerForm />
      </div>
    </section>
  );
};

export default HeroSection;
