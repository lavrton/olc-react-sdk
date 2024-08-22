// Default messages and Typography

export const MESSAGES = {
  TEMPLATE_MESSAGE_ON_SMALL_SCREEN: 'Template Builder is available on tablet and web view only.',
  GENERAL_ERROR: "Internal Server Error",
  TEMPLATE: {
    SEARCH_PLACE_HOLDER: "Search by template name or template ID",
    NAME_REQUIRED: "Template Name is required",
    TYPE_REQUIRED: "Template Type is required",
    DESIGN_NEW: "Design Your Own",
    NO_MY_TEMPLATES: "No My Templates to show",
    LOADING_TEMPLATE: "Loading Templates...",
    NO_TEAM_TEMPLATES: "No Team Templates to show",
    NO_OLC_TEMPLATES: "No OLC Templates to show",
    PRODUCT_TYPE_REQUIRED: "Product Type is required",
    ENVELOPE_TYPE_REQUIRED: "Envelope Type is required",
    POSTCARD_SIZE_REQUIRED: "Postcard Size is required",
    NAME_LESS_50: "Template Name should be less than or equal to 50 characters",
    GSV_RESTRICT_ONE_PER_PAGE: 'Only one GSV image is allowed per page.',
    CREATE: {
      TITLE: 'Create New Template',
      TEMPLATE_LABEL: 'Template Name*',
      PRODUCT_LABEL : 'Product Type*',
      LEARN_TEXT: 'Learn More',
      CANCEL_BUTTON: "Cancel",
      SUBMIT_BUTTON: "Next",
    },
    LIMIT_MODAL: {
      TITLE: "Limit Reached",
      HEADING: "You've reached your template limit",
      SUB_HEADING: "Please Upgrade your subscription to add more templates",
      CANCEL_BUTTON: "Cancel",
      SUBMIT_BUTTON: "View Plans",
    },
    DELETE: {
      TITLE: "Delete Template",
      HEADING: "Are you sure you want to delete this Template?",
      PARAGRAPH:
        "This template will be deleted from your Templates list but will still be included in associated orders.",
    },
    SAVE: {
      TITLE: "Confirm Save Template",
      HEADING: "Are you sure you want to save this template?",
      PARAGRAPH:
        "The updates provided will be used right away for any orders referencing this template.",
      CANCEL_BUTTON: "Cancel",
      SUBMIT_BUTTON: "Save"
    },
    CANCEL: {
      TITLE: "Confirm Cancel Template",
      HEADING: "Are you sure you want to cancel this Template?",
      PARAGRAPH: "You will lose your changes after canceling.",
      BACK_BUTTON: "Go Back",
      CANCEL_BUTTON: "Cancel Template",
    },
    DESIGN_YOUR_OWN: {
      TITLE: "Confirm",
      HEADING: "Are you sure you want to discard these changes?",
      PARAGRAPH:
        "You will lose your changes. Please save your changes or click ok to proceed.",
    },
    SELECT_TEMPLATE: {
      TITLE: "Confirm",
      HEADING:
        "Are you sure you want to change current template with this one?",
      PARAGRAPH:
        "You will lose your changes. Please save your changes or click ok to proceed.",
      SUBMIT_BUTTON: "OK",
      CANCEL_BUTTON: "Cancel",
    },
    DOWNLOAD_PROOF_BUTTON: "Download Proof",
    CANCEL_BUTTON: "Cancel",
    SUBMIT_BUTTON: "Save"
  },
  SNACKBAR: {
    HEADING: "Notifications",
  },
} as const;
