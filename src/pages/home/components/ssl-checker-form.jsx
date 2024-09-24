import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSslChecker } from "@/contexts/ssl-checker.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCheckSSLMutation from "../hooks/useCheckSSLMutation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  domain: z
    .string()
    .min(1, { message: "Domain is required" })
    .refine(
      (value) => {
        const domainRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z]{2,})+$/;
        return domainRegex.test(value);
      },
      {
        message: "Invalid domain name",
      }
    ),
});

const SslCheckerForm = ({}) => {
  const { setSslData } = useSslChecker();
  const { mutate, isPending, isError } = useCheckSSLMutation();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: "",
    },
  });

  const onSubmit = (values) => {
    // console.log(values);
    setSslData(null);
    mutate(values.domain, {
      onSuccess: (data) => {
        console.log(data);
        setSslData(data);
      },
      onError: (error) => {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error?.response?.data?.error || error?.message,
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-5 flex flex-col md:flex-row items-start max-w-sm mx-auto"
      >
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="www.example.com"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Server Address: (Ex. www.example.com)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-fit" disabled={isPending}>
          {isPending ? "Checking..." : "Check SSL"}
        </Button>
      </form>
    </Form>
  );
};

export default SslCheckerForm;
