import { checkSsl } from "@/services/ssl-checker_service";
import { useMutation, useQuery } from "@tanstack/react-query";

const useCheckSSLMutation = () => {
  return useMutation({
    mutationFn: checkSsl,
  });
};

export default useCheckSSLMutation;
