#!/bin/bash

# 커밋 메시지 파일 경로
commit_msg_file=$1

# 커밋 메시지를 읽어옵니다.
commit_msg=$(<"$commit_msg_file")

# 커밋 메시지의 형식을 검증합니다 (예: Conventional Commits 형식)
if ! echo "$commit_msg" | grep -Eq "^(feat|fix|docs|style|refactor|test|chore)\((.*)\): .{1,50}"; then
  echo "❌ 커밋 메시지 형식이 올바르지 않습니다. Conventional Commits 형식을 따르세요."
  exit 1
fi

echo "✅ 커밋 메시지 형식이 올바릅니다."
