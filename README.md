# knayi-cli

[![Greenkeeper badge](https://badges.greenkeeper.io/mapmeld/knayi-cli.svg)](https://greenkeeper.io/)

Simple command-line tool to replace Zawgyi-formatted and WinResearcher-formatted text files with proper

Automatically detects if your file is already in Unicode format.

CLI wrapper for Thuya Myo Nyunt's <a href="https://github.com/greenlikeorange/knayi-myscript">knayi-myscript</a> project.

## Usage

```bash
npm install knayi-cli -g
knayi-cli sample.txt
knayi-cli sample.txt output.txt
```

The WinResearcher font uses ASCII codepoints, and is not feasible to detect. Instead add it to the command:

```bash
knayi-cli sample.txt output.txt winresearcher
```

## License

Open sourced under the MIT license (same as original repo)
