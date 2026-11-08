import SignInForm from "@/components/SignInForm";

const SignInPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) => {
  const { redirect } = await searchParams;

  return <SignInForm redirectTo={redirect} />;
};

export default SignInPage;
