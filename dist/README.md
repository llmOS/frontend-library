# OpenCopilot frontend library

This is an embeddable front-end for [OpenCopilot](https://docs.opencopilot.dev/).

If you are looking for the repository of the OpenCopilot Python framework, see [opencopilotdev/opencopilot](https://github.com/opencopilotdev/opencopilot).

## Usage

```
npm install opencopilot-ui
```

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Include your library -->
    <script src="node_modules/opencopilot-ui/opencopilot.js"></script>
</head>
<body>
    <!--  position this div however you like  -->
    <div id="embedded" style="width: 100vw; height: 100vh;"></div>

    <script>
        // Initialize your component
        OpenCopilot.initialize({
            elementId: "embedded", // The argument is the id of the element where the component should be rendered
            theme: "light",
            apiUrl: "http://localhost:3000/", // Optional, defaults to the base URL this is rendered on
            // authToken: "", // If auth is enabled in backend need to input JWT here
        });
    </script>
</body>
</html>
```
