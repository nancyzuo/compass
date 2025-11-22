for file in _.jpg _.png; do cwebp -q 80 "$file" -o "${file%.\*}.webp"; done
