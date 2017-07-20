import React from 'react';
import ArchiveForm from './ArchiveForm'


export class ArchiveDetailEdit extends React.Component {

    componentDidMount() {
        const { archiveById, fetchById, match } = this.props
        // If coming straight from url, fetch by ID
        if (archiveById === null) fetchById(match.params.id)
    }

    updateSubmit = (values) => {
        console.log(values)
    }

    render() {

        const options = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
            { value: 'three', label: 'Three' }
          ]

        const {archiveById, match} = this.props

        if(archiveById === null) return <div>Loading archive form...</div>

        return <div className="edit-archive-container edit-screen">
                    <ArchiveForm
                        match={match}
                        archiveById={archiveById}
                        options={options}
                     />
                </div>;
    }
}

ArchiveDetailEdit.PropTypes = {
    archiveById: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    fetchById: React.PropTypes.func.isRequired
}
