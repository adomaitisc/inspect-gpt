import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SEO from "../components/SEO";
import Help from "../components/Help";
import Option from "../components/Option";
import { useState } from "react";

export default function Support() {
  const [firstCollapseOpen, setFirstCollapseOpen] = useState(false);
  const [secondCollapseOpen, setSecondCollapseOpen] = useState(false);
  const [thirdCollapseOpen, setThirdCollapseOpen] = useState(false);
  const [fourthCollapseOpen, setFourthCollapseOpen] = useState(false);

  return (
    <>
      <div className="w-full overflow-x-hidden">
        <SEO
          title="InspectGPT | Support"
          description="Get help with our extension."
          image="https://github.com/adomaitisc/inspect-gpt/blob/main/inspect-gpt-next/public/support-image.png?raw=true"
          url="https://inspectgpt.com/support"
        />
        <Background theme="light" />
        <main className="w-full flex flex-col items-center">
          <Header />
          <section className="flex flex-col gap-10 py-20 items-center">
            <Help />
            <div className="flex flex-col items-center w-[90vw]">
              <Option
                setOpen={setFirstCollapseOpen}
                open={firstCollapseOpen}
                title={"How do I reset my password?"}
                content={
                  "To reset your password, click on the 'Forgot Password' link on the login page and follow the prompts to reset your password."
                }
              />
              <Option
                setOpen={setSecondCollapseOpen}
                open={secondCollapseOpen}
                title={"How do I cancel my account?"}
                content={
                  "To cancel your account, please contact our support team through the support form or by emailing [support email address]. Please provide your account information and the reason for cancelling."
                }
              />
              <Option
                setOpen={setThirdCollapseOpen}
                open={thirdCollapseOpen}
                title={"How do I update my payment information?"}
                content={
                  "A: To update your payment information, log in to your account and go to the 'Billing' section. From there, you can update your payment method."
                }
              />
              <Option
                setOpen={setFourthCollapseOpen}
                open={fourthCollapseOpen}
                title={"How do I contact support?"}
                content={
                  "You can contact our support team through the support form on our website or by emailing [support email address]. Our team is available to assist you Monday through Friday, 9am to 5pm EST."
                }
              />
            </div>
          </section>
          <Footer theme="light" />
        </main>
      </div>
    </>
  );
}
