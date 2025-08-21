#!/usr/bin/env bash
set -euo pipefail
export OUTPUT_DIR="${OUTPUT_DIR:-/data/outputs}"
mkdir -p "$OUTPUT_DIR"
uvicorn main:app --host 0.0.0.0 --port "${PORT:-8080}"
