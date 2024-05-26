# Swagger2OpenAPI

Swagger2OpenAPI is a Visual Studio Code extension designed to streamline the process of converting Swagger JSON files to OpenAPI specifications. With this extension, developers can effortlessly generate OpenAPI files from Swagger JSON, enabling seamless integration with various API development workflows.

<video width="600" controls loop autoplay> 
  <source src="https://github.com/dumildematos/swagger2openapi/raw/master/assets/video/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Features

- **Conversion Convenience:** Easily convert Swagger JSON files to OpenAPI specifications within your Visual Studio Code environment.
- **Customization Options:** Configure settings to specify the Swagger JSON URL, output file path, and npm command for streamlined generation.
- **Efficient Workflow:** Execute the conversion process with a single command, enhancing productivity and reducing manual effort.
- **Automatic Execution:** Automatically run npm commands after successful generation, facilitating further processing or integration tasks.
- **Workspace Integration:** Seamlessly integrate OpenAPI generation into your existing VS Code workflow, ensuring a cohesive development experience.

## Usage

1. Configure extension settings to define the Swagger JSON URL, output file path, and npm command.
2. Use the command palette to trigger the OpenAPI generation process.
3. Sit back and let the extension convert the Swagger JSON to OpenAPI format, with the option to execute additional commands upon completion.

## Installation

You can install the Swagger2OpenAPI extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=swagger2openapi).

## Configuration

To configure Swagger2OpenAPI, use the settings available in your Visual Studio Code settings:

- `swagger2openapi.swaggerJsonUrl`: The Swagger JSON URL to fetch the Swagger definition.
- `swagger2openapi.outputPathAndFileName`: The output path and filename for the generated OpenAPI file.
- `swagger2openapi.npmCommand`: The npm command to execute after successful OpenAPI generation.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or pull request on [GitHub](https://github.com/dumildematos/swagger2openapi).

## License

This extension is licensed under the [MIT License](LICENSE).
