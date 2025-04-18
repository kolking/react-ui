#!/bin/bash

# This script will generate a TypeScript file that exports an array
# of all SVG icons (file name without extension) from a specified path.

directory="lib/assets/icons"                 # SVG directory path
output_file="lib/components/Icon/icons.ts"   # Output typescript file

# Check if the directory exists
if [ ! -d "$directory" ]; then
  echo "Directory does not exist: $directory"
  exit 1
fi

# Create .lock folder to ensure only one instance of the shell script
# is writing into the file. When the folder exists, mkdir will fail.
if mkdir scripts/.lock; then
  # Get the list of file names in the directory
  file_names=$(ls "$directory")

  # Create the output file and write the file names as a union type
  echo "// This file is autogenerated, do not modify it manually." > "$output_file"
  echo "// After adding, removing, or renaming svg files in the '$directory'" >> "$output_file"
  echo "// run the '$(basename "$0")' script to update this file." >> "$output_file"
  echo "" >> "$output_file"
  echo "const icons = [" >> "$output_file"
  for file_name in $file_names; do
    name="${file_name%.*}"  # Remove the file extension
    echo "  '$name'," >> "$output_file"
  done
  echo "] as const;" >> "$output_file"

  # Add a semicolon to the very last line
  #sed -i '' '$s/$/;/' "$output_file"

  echo "" >> "$output_file"
  echo "export default icons;" >> "$output_file"

  echo "Output file generated: $output_file"

  # Now the .lock folder can be removed to unlock
  rmdir scripts/.lock
else
  echo "There's another instance of the script running."
  echo "Wait for it to finish or manually delete .lock folder if it stuck."
fi