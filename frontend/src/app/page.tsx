"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { apartmentService } from "./services/apartmentService"
import { projectService } from "./services/projectService" // Assuming you have this service to handle project-related API calls
import ApartmentCard from "./components/ApartmentCard"
import { ApartmentAddFrom } from "./components/ApartmentAddForm"

const Page = () => {
  const [apartments, setApartments] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [projects, setProjects] = useState<any[]>([]) // To store list of projects
  const [selectedProject, setSelectedProject] = useState<number | null>(null) // To track selected project by projectId

  useEffect(() => {
    const fetchApartments = async () => {
      let response;
  
      if (searchQuery.trim() !== "") {
        // Check if searchQuery is a number or a string and fetch accordingly
        const numericSearchQuery = !isNaN(Number(searchQuery)) ? Number(searchQuery) : searchQuery;
  
        if (typeof numericSearchQuery === "number") {
          // If it's a number, fetch apartments by ID
          response = await apartmentService.getApartmentById(numericSearchQuery);
  
          if (response.data.apartment) {
            setApartments([response.data.apartment]); // Only one apartment is returned
            setTotalPages(1); // Only one page to show
          } else {
            setApartments([]); // No results found
            setTotalPages(1);
          }
        } else {
          // If it's a string, fetch apartments by name
          response = await apartmentService.getApartmentByName(searchQuery);
  
          if (response.data.apartment) {
            setApartments([response.data.apartment]); // Only one apartment is returned
            setTotalPages(1); // Only one page to show
          } else {
            setApartments([]); // No results found
            setTotalPages(1);
          }
        }
      } else if (selectedProject !== null) {
        // If a project is selected, fetch apartments by projectId
        response = await projectService.getApartmentsByProjectId(selectedProject, currentPage);
        setApartments(response.data.result.apartments);
        setTotalPages(response.data.result.totalPages);
      } else {
        // If no search term and no project selected, fetch apartments normally with pagination
        response = await apartmentService.getAllApartments(currentPage);
        setApartments(response.data.apartments.apartments);
        setTotalPages(response.data.apartments.totalPages);
      }
    };
  
    fetchApartments();
  }, [currentPage, searchQuery, selectedProject]); // Dependencies are on currentPage, searchQuery, and selectedProject
  

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value
    setSearchQuery(searchTerm)

    if (searchTerm.trim() === "") {
      // Reset pagination and search query when clearing the search input
      setCurrentPage(1)
    }
  }

  const handleProjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    setSelectedProject(Number(selectedValue)) // Convert selected value to number (projectId)
    setCurrentPage(1) // Reset pagination to page 1 on project change
  }

  const handleClearProjectFilter = () => {
    setSelectedProject(null) // Clear the selected project filter
    setCurrentPage(1) // Reset pagination to page 1
  }

  const handleAddApartment = () => {
    setIsFormVisible(prevState => !prevState) // Toggle form visibility
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage) // Change the page based on user click
  }

  const handleFormSubmit = (data: any) => {
    // Handle form submission (e.g., call API to create apartment)
    console.log("Apartment Data Submitted:", data)
    setIsFormVisible(false) // Hide the form after submission
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between">
        <Button onClick={handleAddApartment} className="self-start">
          Add Apartment
        </Button>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search apartments..."
            className="w-80"
          />
        </div>

        {/* Dropdown for Project Filter */}
        <div className="flex items-center space-x-2">
          <select
            value={selectedProject || ""}
            onChange={handleProjectChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="" disabled>
              Select Project
            </option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          <Button
            onClick={handleClearProjectFilter}
            className="bg-red-500 text-white"
          >
            Clear Filter
          </Button>
        </div>
      </div>

      {/* Render the form conditionally */}
      {isFormVisible && <ApartmentAddFrom onFormSubmit={handleFormSubmit} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment.id} apartment={apartment} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center">
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <Button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={cn(
                  "px-4 py-2",
                  pageNumber === currentPage
                    ? "bg-primary text-white"
                    : "bg-background text-primary"
                )}
              >
                {pageNumber}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
