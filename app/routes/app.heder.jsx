import React, { useState } from "react";
import { useFetcher } from "@remix-run/react";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  Page,
  Layout,
  TextField,
  Button,
  DropZone,
  Form,
  FormLayout,
  Banner,
} from "@shopify/polaris";

const HeaderPage = () => {
  const shopify = useAppBridge();
  const [headerScript, setHeaderScript] = useState("");
  const [file, setFile] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const fetcher = useFetcher();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!headerScript.trim()) {
      setErrorMessage("Header script cannot be empty.");
      return;
    }
    setErrorMessage("");

    const formData = new FormData();
    formData.append("script", headerScript);
    if (file.length > 0) {
      formData.append("file", file[0]);
    }

    try {
      const response = await fetch("/script", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Saved data:", result);
        // Handle success (e.g., clear form, show success message, etc.)
      } else {
        setErrorMessage(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Network error");
    }
  };

  const handleFileDrop = (_dropFiles, acceptedFiles) => {
    setFile(acceptedFiles);
  };

  return (
    <Page title="BrandzzyPlugin Task" halfWidth>
      <Layout>
        <Layout.Section>
          {errorMessage && (
            <Banner title="Error" status="critical">
              <p>{errorMessage}</p>
            </Banner>
          )}
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                label="Enter Header Script"
                value={headerScript}
                onChange={(value) => setHeaderScript(value)}
                multiline={4}
                helpText="Enter the script to be included in the header of the store's HTML."
              />
              <DropZone onDrop={handleFileDrop}>
                {file.length > 0 ? (
                  <DropZone.Item file={file[0]} onRemove={() => setFile([])} />
                ) : (
                  <DropZone.FileUpload />
                )}
              </DropZone>
            </FormLayout>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                paddingTop: "20px",
              }}
            >
              <Button submit primary tone="success">
                Save
              </Button>
            </div>
          </Form>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default HeaderPage;
