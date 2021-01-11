import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

const ReleaseNotes = ({ repos, selectedID }) => {
  const repo = useMemo(() => {
    return repos[selectedID];
  }, [repos, selectedID]);

  return (
    <div className="release-notes-container">
      <ReactMarkdown>
        {repo
          ?
          ("# " + repo.name + "\n\n## " + repo.version + "\n\n" + repo.releaseNotes ?? "")
          :
          "# Select a repo to view release notes."
        }
      </ReactMarkdown>
    </div>
  );
};



export default ReleaseNotes;
