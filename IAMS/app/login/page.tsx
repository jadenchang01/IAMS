"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ScanLine } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

// 군 사용자 ID 예시
const militaryUsernames = [
  "포병대대장",
  "정비담당관",
  "포대장",
  "정비병",
  "포반장",
  "군수참모",
  "정비과장",
  "포병장교",
  "정비대장",
  "포병참모",
]

export default function LoginPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [formData, setFormData] = useState({
    licenseNumber: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 실제 앱에서는 여기서 인증 처리
    console.log("로그인 데이터:", formData)

    // 데모 목적으로 성공적인 로그인 시뮬레이션
    localStorage.setItem("isLoggedIn", "true")

    // 군번 대신 무작위 사용자 이름 생성
    const randomUsername = militaryUsernames[Math.floor(Math.random() * militaryUsernames.length)]
    localStorage.setItem("username", randomUsername)

    toast({
      title: "로그인 성공",
      description: "군 통합 포병정비 체계에 오신 것을 환영합니다.",
    })

    // 홈페이지로 리디렉션
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <ScanLine className="h-10 w-10 text-green-600" />
            <h2 className="text-3xl font-bold text-white">군 통합 포병정비 체계</h2>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-white">계정 로그인</h2>
          <p className="mt-2 text-sm text-gray-400">장비 관리 대시보드에 접속하세요</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">로그인</CardTitle>
            <CardDescription className="text-gray-400">계정에 접속하기 위한 인증 정보를 입력하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber" className="text-white">
                  군번
                </Label>
                <Input
                  id="licenseNumber"
                  placeholder="00-00000"
                  value={formData.licenseNumber}
                  onChange={(e) => handleChange("licenseNumber", e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">
                    비밀번호
                  </Label>
                  <Link href="/forgot-password" className="text-sm text-green-500 hover:text-green-400">
                    비밀번호 찾기
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleChange("rememberMe", checked)}
                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                >
                  로그인 상태 유지
                </label>
              </div>

              <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white">
                로그인
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-700 pt-4">
            <p className="text-sm text-gray-400">
              계정이 없으신가요?{" "}
              <Link href="/register" className="text-green-500 hover:text-green-400">
                계정 생성
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
