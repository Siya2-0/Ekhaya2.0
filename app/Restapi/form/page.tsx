import { addItem, deleteCategory, editCategory, editItem, fetchCategory, fetchItems } from '../restapi';
import { addCategory } from '../restapi';

export default async function NewPage() {
  // const response = await editCategory("onetwo threefour five", "yrmpern ofnm", 20);
  // console.log(response);
  // const responseTwo = await addCategory("dummyData", "Second insert");
  // console.log(responseTwo);
  const responseThree = await fetchItems("GIN");
  console.log(responseThree);

  // Function to fetch data and update the DOM
  // const fetchData = async () => {
  //   const resultElement = document.getElementById('result');
    
  //   try {
  //     const dummyData = { name: 'Dummy Category', description: 'This is a dummy category' };
  //     const result = await addCategory("dummyData", "Second insert");
  //     if (result) {
       
  //       resultElement.innerText = `Category added: ${JSON.stringify(result)}`;
        
  //     }
  //   } catch (error) {
  //     if (resultElement) {
  //       resultElement.innerText = `Error adding category:`;
  //     }
  //   }
  // };

  // // Call fetchData when the page loads
  // if (typeof window !== 'undefined') {
  //   window.onload = fetchData;
  // }

  return (
    <main className="min-h-screen min-w-full items-center justify-center flex bg-[#F2F2F2]">
      <div className="card">
        <div className="column left-column">
          <h1 className="text-[#303030]">Add a New Category</h1>
        </div>
        <div className="column right-column">
          <form id="result-form" className="result-form">
            <label htmlFor="result">Result</label>
            <textarea
              id="result"
              name="result"
              readOnly
              rows={10}
              cols={50}
            />
            <button type="submit" >Log in now</button>
          </form>
        </div>
      </div>
    </main>
  );
}
/*{ <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don't have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form> }*/