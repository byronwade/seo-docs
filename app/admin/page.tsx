import { ArrowRight, BarChart3, FileText, Globe, Link2, Search, Settings, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-10 border-b bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Hello, Byron!</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-blue-50 dark:bg-blue-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
              <Globe className="h-4 w-4 text-blue-500 dark:text-blue-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-blue-600 dark:text-blue-300">+56 from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 dark:bg-green-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-500 dark:text-green-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15,231</div>
              <p className="text-xs text-green-600 dark:text-green-300">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 dark:bg-yellow-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Position</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500 dark:text-yellow-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14.3</div>
              <p className="text-xs text-yellow-600 dark:text-yellow-300">-2.1 from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 dark:bg-purple-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Backlinks</CardTitle>
              <Link2 className="h-4 w-4 text-purple-500 dark:text-purple-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,487</div>
              <p className="text-xs text-purple-600 dark:text-purple-300">+243 from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest SEO actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Page</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Updated meta description</TableCell>
                    <TableCell>/home</TableCell>
                    <TableCell>2023-10-15</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Complete
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Added internal links</TableCell>
                    <TableCell>/blog/seo-tips</TableCell>
                    <TableCell>2023-10-14</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Complete
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Optimized images</TableCell>
                    <TableCell>/products</TableCell>
                    <TableCell>2023-10-13</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                        In Progress
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Submitted sitemap</TableCell>
                    <TableCell>sitemap.xml</TableCell>
                    <TableCell>2023-10-12</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Complete
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used SEO tools and resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-between bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700" variant="outline">
                <span className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  Keyword Research
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button className="w-full justify-between bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700" variant="outline">
                <span className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Content Audit
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button className="w-full justify-between bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-100 dark:hover:bg-purple-700" variant="outline">
                <span className="flex items-center">
                  <Link2 className="mr-2 h-4 w-4" />
                  Backlink Analysis
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button className="w-full justify-between bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600" variant="outline">
                <span className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Site Settings
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Pages</CardTitle>
            <CardDescription>Pages with the highest organic traffic in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Organic Traffic</TableHead>
                  <TableHead>Avg. Position</TableHead>
                  <TableHead>CTR</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">/home</TableCell>
                  <TableCell>5,123</TableCell>
                  <TableCell>3.2</TableCell>
                  <TableCell>4.7%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">/blog/seo-guide</TableCell>
                  <TableCell>3,844</TableCell>
                  <TableCell>5.7</TableCell>
                  <TableCell>3.9%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">/products/seo-tool</TableCell>
                  <TableCell>2,712</TableCell>
                  <TableCell>8.1</TableCell>
                  <TableCell>2.8%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">/services</TableCell>
                  <TableCell>1,928</TableCell>
                  <TableCell>6.4</TableCell>
                  <TableCell>3.2%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}