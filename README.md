# knayi-cli

Simple command-line tool to replace Zawgyi-formatted and WinResearcher-formatted text files with proper

Automatically detects if your file is already in Unicode format.

CLI wrapper for Thuya Myo Nyunt's <a href="https://github.com/greenlikeorange/knayi-myscript">knayi-myscript</a> project. Requires Node.js 22 or newer and knayi-myscript 2.9.0. Unicode text that still uses the old diacritic code points is reordered with my-diacritic-sort.

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
