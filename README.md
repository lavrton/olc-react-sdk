# OLC React SDK

The `OLC React SDK` SDK allows developers to integrate a customizable template builder into their applications. This SDK provides a range of options to manage templates, handle authentication, and customize the look and feel of the template builder.

## Installation

To install the SDK, use npm:

```bash
npm install @openlettermarketing/olc-react-sdk

import TemplateBuilder from '@openlettermarketing/olc-react-sdk';

const templateBuilderProps: TemplateBuilderProps = {
  container: document.getElementById('template-builder-container'),
  secretKey: 'your-secret-key',
  basicAuthUsername: 'your-username',
  basicAuthPassword: 'your-password',
  platformName: 'Your Platform Name',
  createTemplateRoute: '/create-template',
  templateBuilderRoute: '/edit-template',
  olcTemplate: yourTemplateObject,
  onReturnAndNavigate: () => {
    // Define what happens when the user returns and navigates.
  },
  onGetOneTemplate: async (payload) => {
    // Fetch a specific template.
  },
  onGetTemplates: async (payload) => {
    // Fetch all templates.
  },
  onGetCustomFields: async () => {
    // Fetch custom fields for the templates.
  },
  onSubmit: async (payload) => {
    // Handle the submission of a template.
  },
  styles: {
    root: {
      // Custom CSS properties for the root element.
    },
  },
};

TemplateBuilder(templateBuilderProps);
```

## TemplateBuilderProps Interface
This interface defines the structure for the properties that you can pass to the TemplateBuilder SDK.

## Properties

#### container (HTMLElement | null):
The container element where the template builder will be rendered. This must be an HTML element in your DOM.

#### secretKey (string):
The secret key used for authenticating requests.

#### basicAuthUsername (string):
The username for basic authentication.

#### basicAuthPassword (string):
The password for basic authentication.

#### platformName (string | null, optional):
The name of the platform where the template builder is integrated.

#### createTemplateRoute (string | null, optional):
The route used for creating new templates.

#### templateBuilderRoute (string | null, optional):
The route used for editing existing templates.

#### olcTemplate (Record<string, any>, optional):
An object representing the template to be edited or used as a base.

#### onReturnAndNavigate (() => void, optional):
A callback function triggered when the user returns and navigates away from the template builder.

#### onGetOneTemplate ((payload: any) => Promise<any>, optional):
A function to fetch a specific template. It receives a payload and returns a promise.

#### onGetTemplates ((payload: any) => Promise<any>, optional):
A function to fetch all templates. It receives a payload and returns a promise.

#### onGetCustomFields (() => Promise<any>, optional):
A function to fetch custom fields associated with the templates.

#### onSubmit ((payload: any) => Promise<any>, optional):
A function triggered upon submitting a template. It receives a payload and returns a promise.

#### styles (object, optional):
An object for custom CSS properties to style the template builder's root element.

## Example Usage
```bash
import { useEffect } from "react";

import TemplateBuilder from "@openlettermarketing/olc-react-sdk";
import '@blueprintjs/core/lib/css/blueprint.css';

function App() {
  useEffect(() => {
    TemplateBuilder({
      container: document.getElementById('template-builder-container'),
      secretKey: 'your-secret-key',
      basicAuthUsername: 'your-username',
      basicAuthPassword: 'your-password',
      onSubmit: async (payload) => {
        console.log('Template submitted:', payload);
        // Add your submission logic here
      },
    });
  }, []);

  return (
    <>
      <div id="template-builder-container"></div>
    </>
  );
}

export default App;
```

## License
This SDK is licensed under the MIT License