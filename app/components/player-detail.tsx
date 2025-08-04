"use client"

import { ArrowLeft, Trophy, Target, Users, Clock, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface Player {
  id: number
  name: string
  team: string
  position: string
  age: number
  nationality: string
  image: string
  height: string
  weight: string
  preferredFoot: string
  marketValue: string
  stats: {
    goals: number
    assists: number
    matches: number
    minutes: number
    yellowCards: number
    redCards: number
    rating: number
    passAccuracy: number
    shotsOnTarget: number
    dribbles: number
    shots: number
    shotAccuracy: number
    penaltiesScored: number
    penalties: number
    distanceCovered: number
    sprints: number
    topSpeed: number
    bigChancesCreated: number
    touchesInBox: number
    keyPasses: number
    tacklesWon: number
    tackles: number
    aerialDuelsWon: number
    interceptions: number
    clearances: number
    starts: number
  }
}

interface PlayerDetailProps {
  player: Player
  onBack: () => void
}

export function PlayerDetail({ player, onBack }: PlayerDetailProps) {
  const [selectedSeason, setSelectedSeason] = useState<string>("2024-25")

  const getPositionColor = (position: string) => {
    switch (position) {
      case "ST":
        return "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 border-red-500/30"
      case "RW":
      case "LW":
        return "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 border-blue-500/30"
      case "CAM":
        return "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 border-green-500/30"
      case "CB":
        return "bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 border-purple-500/30"
      default:
        return "bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30"
    }
  }

  // Örnek form grafiği verisi
  const formData = [
    { match: 1, rating: 8.2, goals: 1, assists: 0 },
    { match: 2, rating: 8.7, goals: 2, assists: 1 },
    { match: 3, rating: 7.8, goals: 0, assists: 2 },
    { match: 4, rating: 9.1, goals: 3, assists: 1 },
    { match: 5, rating: 8.5, goals: 1, assists: 1 },
    { match: 6, rating: 8.9, goals: 2, assists: 0 },
    { match: 7, rating: 8.3, goals: 1, assists: 2 },
    { match: 8, rating: 9.2, goals: 2, assists: 1 },
  ]

  const goalsPerMatch = player.stats.goals / player.stats.matches
  const assistsPerMatch = player.stats.assists / player.stats.matches
  const minutesPerMatch = player.stats.minutes / player.stats.matches

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <header className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="cursor-pointer text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
              <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-25">2024-25</SelectItem>
                <SelectItem value="2023-24">2023-24</SelectItem>
                <SelectItem value="2022-23">2022-23</SelectItem>
                <SelectItem value="2021-22">2021-22</SelectItem>
              </SelectContent>
            </Select>
            <h1 className="text-2xl font-bold text-white">{player.name} - Details</h1>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Player Info */}
        <Card className="mb-8 bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0">
                <Avatar className="h-40 w-40 border-4 border-white/20 shadow-2xl">
                  <AvatarImage
                    src={player.image || "/placeholder.svg"}
                    alt={player.name}
                    className="object-cover object-top"
                  />
                  <AvatarFallback className="text-4xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
                    {player.name.split(" ").map((n) => n[0])}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-4xl mb-2 text-white">{player.name}</CardTitle>
                <CardDescription className="text-xl mb-4 text-gray-300">{player.team}</CardDescription>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className={`${getPositionColor(player.position)} border backdrop-blur-sm`}>
                    {player.position}
                  </Badge>
                  <Badge variant="outline" className="border-white/20 text-gray-300">
                    {player.age} yaş
                  </Badge>
                  <Badge variant="outline" className="border-white/20 text-gray-300">
                    {player.nationality}
                  </Badge>
                  <Badge variant="outline" className="border-white/20 text-gray-300">
                    {player.height} • {player.weight}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <span className="font-medium">Tercih Edilen Ayak:</span> {player.preferredFoot}
                  </div>
                  <div>
                    <span className="font-medium">Piyasa Değeri:</span> {player.marketValue}
                  </div>
                  <div>
                    <span className="font-medium">Toplam Maç:</span> {player.stats.matches}
                  </div>
                  <div>
                    <span className="font-medium">Başlangıç:</span> {player.stats.starts}
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                  {player.stats.rating}
                </div>
                <div className="text-sm text-gray-400">Genel Rating</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Goals</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-red-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{player.stats.goals}</div>
              <p className="text-xs text-gray-400">Per match {goalsPerMatch.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Assists</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{player.stats.assists}</div>
              <p className="text-xs text-gray-400">Per match {assistsPerMatch.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Minutes Played</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{player.stats.minutes}</div>
              <p className="text-xs text-gray-400">Per match {minutesPerMatch.toFixed(0)} min</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Goal + Assist</CardTitle>
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{player.stats.goals + player.stats.assists}</div>
              <p className="text-xs text-gray-400">
                Per match {((player.stats.goals + player.stats.assists) / player.stats.matches).toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="mb-8 bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Performance</CardTitle>
            <CardDescription className="text-gray-400">Rating and goal/assist performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                rating: {
                  label: "Rating",
                  color: "hsl(var(--chart-1))",
                },
                goals: {
                  label: "Goals",
                  color: "hsl(var(--chart-2))",
                },
                assists: {
                  label: "Assists",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formData}>
                  <XAxis dataKey="match" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="rating"
                    stroke="var(--color-rating)"
                    fill="var(--color-rating)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Attack Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2 text-white">
                  <span>Goal Success Rate</span>
                  <span>{((player.stats.goals / player.stats.shots) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(player.stats.goals / player.stats.shots) * 100} className="h-2 bg-white/10" />
              </div>
              <div>
                <div className="flex justify-between mb-2 text-white">
                  <span>Big Chances Created</span>
                  <span>{player.stats.bigChancesCreated}</span>
                </div>
                <Progress value={(player.stats.bigChancesCreated / 100) * 100} className="h-2 bg-white/10" />
              </div>
              <div>
                <div className="flex justify-between mb-2 text-white">
                  <span>Box Touches</span>
                  <span>{player.stats.touchesInBox}</span>
                </div>
                <Progress value={(player.stats.touchesInBox / 300) * 100} className="h-2 bg-white/10" />
              </div>
              <div>
                <div className="flex justify-between mb-2 text-white">
                  <span>Key Passes</span>
                  <span>{player.stats.keyPasses}</span>
                </div>
                <Progress value={(player.stats.keyPasses / 100) * 100} className="h-2 bg-white/10" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-400" />
                Defense Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2 text-white">
                  <span>Tackle Success Rate</span>
                  <span>{((player.stats.tacklesWon / player.stats.tackles) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(player.stats.tacklesWon / player.stats.tackles) * 100} className="h-2 bg-white/10" />
              </div>
              <div>
                <div className="flex justify-between mb-2 text-white">
                  <span>Aerial Duels Won</span>
                  <span>{player.stats.aerialDuelsWon}</span>
                </div>
                <Progress value={(player.stats.aerialDuelsWon / 200) * 100} className="h-2 bg-white/10" />
              </div>
              <div>
                <div className="flex justify-between mb-2 text-white">
                  <span>Interceptions</span>
                  <span>{player.stats.interceptions}</span>
                </div>
                <Progress value={(player.stats.interceptions / 100) * 100} className="h-2 bg-white/10" />
              </div>
              <div>
                <div className="flex justify-between mb-2 text-white">
                  <span>Clearances</span>
                  <span>{player.stats.clearances}</span>
                </div>
                <Progress value={(player.stats.clearances / 300) * 100} className="h-2 bg-white/10" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
