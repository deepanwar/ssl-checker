import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSslChecker } from "@/contexts/ssl-checker.context";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import {
  TbCertificate,
  TbCircleCheck,
  TbCircleX,
  TbLink,
  TbLinkOff,
} from "react-icons/tb";

const RenderSection = ({ className }) => {
  const { sslData } = useSslChecker();

  const calculateRemainDays = (date2) => {
    const today = dayjs();
    const secondDate = dayjs(date2);
    return secondDate.diff(today, "day");
  };

  if (!sslData) return null;

  return (
    <section className={cn("container mx-auto px-6", className)}>
      <hr className="my-5" />
      <div className="flex flex-col space-y-2">
        <Card>
          <CardHeaderWithIcon>
            DNS resolves {sslData?.domain} to {sslData?.ipAddress}
          </CardHeaderWithIcon>
        </Card>

        {/* is valid */}
        <Card>
          <CardHeaderWithIcon type={sslData?.isExpired ? "danger" : "success"}>
            {sslData?.isExpired ? "Expired" : "Valid"}
          </CardHeaderWithIcon>
        </Card>

        {/* Meta data */}
        <Card>
          <CardHeaderWithIcon>Meta data</CardHeaderWithIcon>
          <CardContent>
            <CardDescription>
              <strong>Common Name</strong> : {sslData?.metadata?.subject?.CN}
            </CardDescription>
            <CardDescription>
              <strong>Subject Alternative Names</strong> :{" "}
              {sslData?.metadata?.subjectaltname}
            </CardDescription>
            <CardDescription>
              <strong>Issuer</strong> : {sslData?.metadata?.issuer?.CN}
            </CardDescription>
            <CardDescription>
              <strong>Serial Number</strong> : {sslData?.metadata?.serialNumber}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Revoked */}
        <Card>
          <CardHeaderWithIcon type={sslData?.isRevoked ? "danger" : "success"}>
            {sslData?.isRevoked
              ? "TLS Certificate has been revoked"
              : "TLS Certificate has not been revoked"}
          </CardHeaderWithIcon>
          <CardContent>
            <CardDescription>
              <strong>OSCP Status</strong> :{" "}
              {sslData?.isRevoked ? "revoked" : "good"}
            </CardDescription>
          </CardContent>
        </Card>

        {/* Self Signed */}
        <Card>
          <CardHeaderWithIcon
            type={sslData?.isSelfSigned ? "danger" : "success"}
          >
            {sslData?.isSelfSigned
              ? "TLS Certificate is self-signed"
              : "TLS Certificate is not self-signed"}
          </CardHeaderWithIcon>
        </Card>

        {/* Valid for domain */}
        <Card>
          <CardHeaderWithIcon
            type={sslData?.isValidForDomain ? "success" : "danger"}
          >
            {sslData?.isValidForDomain
              ? "TLS Certificate is valid for domain"
              : "TLS Certificate is not valid for domain"}
          </CardHeaderWithIcon>
        </Card>

        {/* Expiration */}
        <Card>
          <CardHeaderWithIcon>TLS Certificate expiration</CardHeaderWithIcon>
          <CardContent>
            <CardDescription>
              {dayjs(sslData?.metadata?.validFrom).format("DD MMM YYYY")} -{" "}
              {dayjs(sslData?.metadata?.validTo).format("DD MMM YYYY")}
              <span className="ml-2">
                ({calculateRemainDays(sslData?.metadata?.validTo)} days from
                today)
              </span>
            </CardDescription>
          </CardContent>
        </Card>

        {/* Certificate Chain */}
        <Card>
          <CardHeaderWithIcon>
            Certificate Name matches {sslData?.domain}
          </CardHeaderWithIcon>
          <CardContent className="space-y-4">
            {sslData?.certificateChain?.map((certificate, index) => (
              <CertificateCard
                key={index}
                certificate={certificate}
                isFirst={index === 0}
                isLast={index === sslData?.certificateChain?.length - 1}
                index={index}
                certificates={sslData?.certificateChain}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

const CertificateCard = ({
  certificate,
  isFirst,
  isLast,
  certificates,
  index,
}) => {
  const isLinked = () => {
    if (isLast) return;
    return certificates[index + 1]?.subject?.CN === certificate?.issuer?.CN;
  };
  return (
    <>
      <article className="flex flex-col md:flex-row gap-3 items-center">
        <div className="flex items-center justify-center flex-col">
          <span className="text-xs">
            {isFirst ? "Sever" : isLast ? "Root" : "Intermediate"}
          </span>
          <TbCertificate size={60} className="shrink-0 stroke-1" />
        </div>
        <div className="text-sm text-muted-foreground">
          <p>
            <span className=" font-medium w-[500px]">Subject : </span>{" "}
            {certificate?.subject?.CN}
          </p>
          <p>
            <span className=" font-medium w-[500px]">Validity : </span>{" "}
            {dayjs(certificate?.validFrom).format("DD/MMM/YYYY")} to{" "}
            {dayjs(certificate?.validTo).format("DD/MMM/YYYY")}
          </p>
          <p>
            <span className=" font-medium w-[500px]">Issuer : </span>{" "}
            {certificate?.issuer?.CN}
          </p>
          <p>
            <span className=" font-medium w-[500px]">Serial Number : </span>{" "}
            {certificate?.serialNumber}
          </p>
        </div>
      </article>
      <div className="ml-4 flex justify-center md:justify-start py-2 last:hidden">
        {isLinked() ? (
          <TbLink size={24} className="shrink-0 text-green-500" />
        ) : (
          <TbLinkOff size={24} className="shrink-0 text-red-500" />
        )}
      </div>
    </>
  );
};

const CardHeaderWithIcon = ({ children, type = "success" }) => {
  return (
    <CardHeader className="flex flex-row items-center space-x-2">
      {type === "success" ? (
        <TbCircleCheck size={24} className="text-green-500 shrink-0" />
      ) : (
        <TbCircleX size={24} className="text-red-500 shrink-0" />
      )}

      <CardTitle className="!mt-0">{children}</CardTitle>
    </CardHeader>
  );
};

export default RenderSection;
